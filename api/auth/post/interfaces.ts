import { SerializedImage } from '../../../utils/serializeImage';

export interface CreateUserParams {
  firstName: string
  lastName: string
  nickName: string
  email: string
  password: string
  avatar: SerializedImage
  policy: boolean
}

export interface AuthenticateUserParams {
  email: string
  password: string
}
