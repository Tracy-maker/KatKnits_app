import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";


const AllUsers = () => {
  const { toast } = useToast();
const {data:creators , isLoading, isError:isErrorCreators} = useGetUsers();

  return <div></div>;
};

export default AllUsers;
