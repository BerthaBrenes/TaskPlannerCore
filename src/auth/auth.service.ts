import { HttpException, HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/users.repository';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {

    private daticUrl = process.env.DATIC_URL || 'http://localhost:8080/datic/api/auth';

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private http: HttpService,
    ) { }
    
    /**
     * Performs authentication of a user so that it can log in to the system.
     * @param credentials User authentication credentials.
     * @returns A promise with authentication information.
     */
    async logIn(credentials: AuthCredentialDTO): Promise<any> {
        
        const email = credentials.email;
        const user = await this.userRepository.findOne({email: email});

        if(!user)
            throw new UnauthorizedException('There is no user registered to this email');

        return this.consultDatic(credentials);
    }


    /**
     * Performs pre-authentication of a user's credentials to determine if they 
     * can sign up to the system.
     * @param credentials User authentication credentials.
     * @returns A promise with authentication information. 
     */
    async signUp(credentials: AuthCredentialDTO): Promise<any> {
        const email = credentials.email;
        const user = await this.userRepository.findOne({email: email});

        if (user)
            throw new UnauthorizedException('The user already has a registered account');
        
        const response = await this.consultDatic(credentials);
        return { email: response['email'], role: response['role']};
    }


    /**
     * Performs the procedure of connecting to DATIC resources to authenticate a user's credentials.
     * @param credentials User authentication credentials.
     * @returns A promise with authentication information. 
     */
    async consultDatic(credentials: AuthCredentialDTO): Promise<any> {
        const response = await this.http.post(this.daticUrl, credentials)
                        .pipe(
                            catchError(e => {
                                throw new HttpException(e.response.data, e.response.status);
                            }),
                        ).toPromise();
        console.log(response.data);
        return response.data;
    }
}
