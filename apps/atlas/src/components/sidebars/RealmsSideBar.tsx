import { Button } from '@bibliotheca-dao/ui-lib';
import Castle from '@bibliotheca-dao/ui-lib/icons/castle.svg';
import Close from '@bibliotheca-dao/ui-lib/icons/close.svg';
import { useRouter } from 'next/router';
import { useGetLoreEntitiesQuery, useGetRealmQuery } from '@/generated/graphql';
import { useAtlasContext } from '@/hooks/useAtlasContext';
import { LoreEntityCard } from '../cards/LoreEntityCard';
import { RealmCard } from '../cards/RealmCard';
import { BaseSideBar } from './BaseSideBar';

export const RealmSideBar = ({ realmId }: { realmId: string }) => {
  const { toggleMenuType } = useAtlasContext();
  const router = useRouter();
  const { id } = router.query;
  const isRealmsSelected = !!id;
  const { data, loading } = useGetRealmQuery({
    variables: {
      id: parseInt(realmId ?? '0'),
    },
    skip: !isRealmsSelected,
  });
  const { data: loreEntitiesData, loading: loreEntitiesLoading } =
    useGetLoreEntitiesQuery({
      variables: {
        filter: {
          revisions: {
            every: {
              pois: {
                some: {
                  poiId: {
                    equals: 1000,
                  },
                  assetId: {
                    equals: (id as string) ?? '',
                  },
                },
              },
            },
          },
        },
        take: 5,
      },
      skip: !isRealmsSelected,
    });

  return (
    <BaseSideBar open={false}>
      <div className="top-0 bottom-0 right-0 w-full p-6 pt-8 overflow-auto lg:w-5/12 rounded-r-2xl">
        <div className="flex justify-end">
          <div className="flex justify-end mb-2 mr-1">
            <Button size="sm" onClick={() => toggleMenuType('realm')}>
              <Close />
            </Button>
          </div>
        </div>
        {data && data.realm && (
          <RealmCard realm={data!.realm} loading={loading} />
        )}
        {loading && (
          <div className="flex flex-col items-center w-20 gap-2 mx-auto my-40 animate-pulse">
            <Castle className="block w-20 fill-current" />
            <h2>Loading</h2>
          </div>
        )}

        {/* {!loading && !loreEntitiesLoading && (
          <div className={`mt-2`}>
            <div className={`bg-black/10 rounded-md p-2`}>
              <h2 className={`text-2xl`}>Lore</h2>
              {loreEntitiesData?.getLoreEntities.length === 0 && (
                <>
                  <div className="text-xl">
                    No Lore for {data!.realm?.name} has written yet! Want to be
                    the first?
                  </div>
                </>
              )}
              {loreEntitiesData?.getLoreEntities.map((entity, index) => (
                <div key={index} className={`mt-2`}>
                  <LoreEntityCard entity={entity} />
                </div>
              ))}
              {data && (
                <div className="mt-2">
                  <Button
                    href="/lore"
                    size="lg"
                    className="w-full"
                    variant={'primary'}
                  >
                    Start writing Lore for {data!.realm?.name}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </BaseSideBar>
  );
};
