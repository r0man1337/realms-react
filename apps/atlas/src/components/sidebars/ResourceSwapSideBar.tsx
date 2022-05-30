import { useQuery } from '@apollo/client';
import { Button, Tabs } from '@bibliotheca-dao/ui-lib';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import Menu from '@bibliotheca-dao/ui-lib/icons/menu.svg';

import { useMemo } from 'react';
import { SwapResources } from '@/components/tables/SwapResources';
import { useGetRealmQuery, useGetDesiegeQuery } from '@/generated/graphql';
import { getRealmQuery } from '@/hooks/graphql/queries';
import { useUIContext } from '@/hooks/useUIContext';
import type { Data } from '@/types/index';
import { BaseSideBar } from './BaseSideBar';
type Props = {
  resources?: string[];
};

export const ResourceSwapSideBar = (props: Props) => {
  const { toggleMenuType, selectedMenuType, showDetails } = useUIContext();

  /* const { loading, error, data } = useQuery<Data>(getRealmQuery, {
    variables: { id: props.id.toString() },
  }); */
  const tabs = useMemo(
    () => [
      {
        label: 'Swap',
        component: <SwapResources key="1" />,
      },
      {
        label: 'LP Merchant',
        component: <Menu />,
      },
      // {
      //   label: 'Stake',
      //   component: <Menu />,
      // },
    ],
    []
  );
  return (
    <BaseSideBar open={selectedMenuType === 'resourceSwap' && showDetails}>
      <div className="top-0 bottom-0 right-0 w-full h-auto p-6 pt-10 lg:w-5/12 rounded-r-2xl">
        <div className="flex justify-between w-full">
          <Button
            variant="secondary"
            size="xs"
            className="ml-auto"
            onClick={() => toggleMenuType('resourceSwap')}
          >
            <Close />
          </Button>
        </div>
        <div>
          <h1 className="my-8 text-center font-lords">Resource emporium</h1>
        </div>
        <div className="relative">
          <Tabs className="h-full" variant="primary">
            <Tabs.List className="">
              {tabs.map((tab) => (
                <Tabs.Tab key={tab.label} className="uppercase">
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
            <Tabs.Panels className="h-full p-4 rounded shadow-inner bg-black/30">
              {tabs.map((tab) => (
                <Tabs.Panel key={tab.label}>{tab.component}</Tabs.Panel>
              ))}
            </Tabs.Panels>
          </Tabs>
        </div>
      </div>
    </BaseSideBar>
  );
};
