import { gql, useQuery } from "urql";
import contracts from "~~/generated/hardhat_contracts";

const BuildersQuery = gql`
  query Builders($cohortAddress: String!) {
    cohortBuilders(where: { cohortContractAddress: $cohortAddress }, orderBy: "timestamp", orderDirection: "desc") {
      items {
        id
      }
    }
  }
`;

export const useAddBuilderEvents = () => {
  const [{ data: addBuilderEventsData, fetching: isLoading }] = useQuery({
    query: BuildersQuery,
    variables: {
      cohortAddress: contracts[10][0].contracts.SandGardenStreams.address,
    },
  });

  const data = addBuilderEventsData?.cohortBuilders.items || [];
  return { data, isLoading };
};
