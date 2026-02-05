import { useMutation } from "@tanstack/react-query"
import { postData } from "~/lib/fetch-util"
import type { SignUpFormData } from "~/routes/auth/sign-up"

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: (data: SignUpFormData) => postData('/auth/register', data),
    })
}