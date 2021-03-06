import { IsNotEmpty } from 'class-validator';

export class RegisterRequest {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}
