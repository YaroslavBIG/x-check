import { Roles } from "enum/roles.enum";

export interface IProfile {
  firebase: {
    profile: {
      createdAt: {
        seconds: number,
        nanoseconds: number
      }
      role: Roles
      email: string
      photoURL: string
      displayName: string
      isEmpty: boolean
      isLoaded: boolean
    }
  }
}
