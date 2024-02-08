"use client";

import LoadingButton from "@/components/LoadingButton";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return <LoadingButton type="submit" loading={pending} {...props} />;
}
