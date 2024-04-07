import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type InputProps = {
  id: string;
  label?: string;
  errors?: FieldErrors<FieldValues>;
  type?: string;
  disabled?: boolean;
  register?: UseFormRegister<FieldValues>;
  required?: boolean;
  isPriceInput?: boolean;
  onChange?: (v:any)=>void;
  value?: string;
};
