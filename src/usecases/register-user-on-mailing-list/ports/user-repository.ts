import { UserData } from '@/entities'
export interface UserRepository {
    add(user: UserData): Promise<void>
    findUserByEmail(email: String): Promise<UserData>
    findAllUsers(): Promise<UserData[]>
    exists(user: UserData): Promise<boolean>

}
