export class RegisterRequest {
  username: string
  password: string
}

export class LoginRequest {
  username: string
  password: string
}

export class UpdateUserInfoRequest {
  nickname?: string
  avatar?: string
}
