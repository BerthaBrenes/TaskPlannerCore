import { Injectable } from '@nestjs/common';
import { BoardsRepository } from 'src/boards/boards.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import { Month } from '../data/dates';
@Injectable()
export class StatisticsService {
    /**
     * First method in the component
     * @param boardRepository Controller for the board repository
     */
    constructor(@InjectRepository(BoardsRepository)
    private boardRepository: BoardsRepository, @InjectRepository(UserRepository)
    private userRepository: UserRepository) { }

    /**
     * Get the statistics by month
     * @param id of the user
     * @param month of the month
     */
    async getStatisticsMonth(id: string, month: number){
        const found = await this.boardRepository.find({where: {
            id: id, 
            creationDate : month
        }});
        return found.length;
    }
    /**
     * Get the statistics by month
     * @param id of the user
     * @param month of the month
     */
    async getStatisticsByLast6(id: string, month: Date){
        const found = await this.boardRepository.aggregate([
            {
              $project: {
                owner: 1,
                result: {$and: [ {owner: `${id}`}, {sixMonthOldDate: { $subtract: [ "$$NOW", 1611506010000 ] }}]}
              }
            }]
          );
        return found;
    }
}
