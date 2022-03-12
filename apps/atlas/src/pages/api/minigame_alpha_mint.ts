import { utils } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Provider, ec, encode, Account } from 'starknet';
import { MINIMUM_LORDS_REQUIRED } from '@/constants/index';
import { fetchLordsBalance } from '@/util/fetchL1';
import { messageKey } from '@/util/messageKey';
import {
  getModuleAddress,
  getNextMintAmount,
  getTotalElementsMinted,
} from '@/util/minigameApi';

export type MintingError = {
  success: false;
  error: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { sig, starknetAddress, chosenSide, gameIdx } = req.body;

  const ethAddress = utils.verifyMessage(messageKey(starknetAddress), sig);

  const lordsBalance = await fetchLordsBalance(ethAddress);

  const suppressERC20Requirement =
    process.env.NEXT_PUBLIC_SUPPRESS_TOKEN_REQUIREMENT == '1';

  if (lordsBalance.lt(MINIMUM_LORDS_REQUIRED) && !suppressERC20Requirement) {
    res.send(
      JSON.stringify({
        success: false,
        error: 'Insufficient LORDS balance',
      })
    );
    return;
  }

  // Mint on StarkNet (testnet)
  const provider = new Provider({
    network: 'goerli-alpha',
  });

  const minterPrivKey = encode.addHexPrefix(
    process.env.ELEMENTS_MINTER_PRIVATE_KEY as string
  );

  let signerAccount;
  try {
    const privKey = ec.getKeyPair(minterPrivKey);
    const account =
      (process.env.ELEMENTS_MINTER_ACCOUNT_ADDRESS as string) ||
      '0x430728b8d6252608f35615191903466284b01e4ae9ecff60de8a6cb99d44a10';
    signerAccount = new Account(provider, account, privKey);
  } catch (e) {
    console.error('SIGNING ERROR:', e);
    throw e;
  }

  const gameIndexInt = parseInt(gameIdx);

  // The amount includes 2-decimal precision
  // so multiply by 100
  let amountToMint: number;
  try {
    const totals = await getTotalElementsMinted(gameIndexInt);
    // Dynamic element balancing
    amountToMint = getNextMintAmount(totals);
  } catch (e) {
    console.error('CONTRACT CALL ERROR:', e);
    throw e;
  }

  const nextGameIdx = gameIndexInt + 1;

  // Elements cannot be re-used between games
  // so the 1155 token indexes start at a deterministic index
  // and IDs are offset from there
  // Ex. light = startIndex + 1, dark = startIndex + 2
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const INDEX_BASE_FACTOR = 10;
  const tokenStartIndex = nextGameIdx * INDEX_BASE_FACTOR;

  const elementBalancerModule = await getModuleAddress('4');

  const entrypoint = 'mint_elements';
  const mintArgs = [
    nextGameIdx,
    ethAddress,
    starknetAddress,
    chosenSide == 'light' ? tokenStartIndex + 1 : tokenStartIndex + 2,
    amountToMint,
  ];

  try {
    const result = await signerAccount.execute({
      contractAddress: elementBalancerModule,
      entrypoint,
      calldata: mintArgs,
    });
    res.send(JSON.stringify(result));
    return;
  } catch (e: any) {
    console.error('MINTING ERROR:', e);
    res.send(
      JSON.stringify({
        success: false,
        error: e.message,
      })
    );
    return;
  }
};
