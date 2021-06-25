import { HttpException, HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/users.repository';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {

    private daticUrl = 'http://localhost:8080/datic/api/auth';

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private http: HttpService,
    ) { }
    
    /**
     * 
     * @param credentials 
     * @returns 
     */
    async logIn(credentials: AuthCredentialDTO): Promise<any> {
        
        const email = credentials.email;
        const user = await this.userRepository.findOne({email: email});

        if(!user)
            throw new UnauthorizedException('There is no user registered to this email');

        return this.consultDatic(credentials);
    }


    /**
     * 
     * @param credentials 
     * @returns 
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
