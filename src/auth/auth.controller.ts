import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    private logger = new Logger('AuthController');

    constructor(
        private authService: AuthService
    ) { }
    

    @Post('/login')
    logIn(@Body(ValidationPipe) credentials: AuthCredentialDTO): Promise<any> {
        this.logger.verbose(`LogIn attempt with identity: ${JSON.stringify(credentials.email)}`);
        return this.authService.logIn(credentials);
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) credentials: AuthCredentialDTO): Promise<any> {
        this.logger.verbose(`Check if it is possible to register the user: ${JSON.stringify(credentials.email)}`);
        return this.authService.signUp(credentials);
    }


}
