import { Button } from "@/components/ui/button";

import * as z from "zod";

const SignupForm = () => {
  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });
  return (
    <div>
      <Button>Click</Button>
    </div>
  );
};

export default SignupForm;
