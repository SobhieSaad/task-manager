import { useMutation } from "@tanstack/react-query"
import { postData } from "~/lib/fetch-util"
import type { SignUpFormData } from "~/routes/auth/sign-up"

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: (data: SignUpFormData) => postData('/auth/register', data),
    })
}

export const useVerifyEmailmutation = () => {
    return useMutation({
        mutationFn: (data: { token: string}) =>
            postData('/auth/verify-email', data)
    })
}