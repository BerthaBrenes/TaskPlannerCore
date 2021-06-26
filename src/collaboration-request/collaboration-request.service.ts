import { Injectable, NotFoundException } from '@nestjs/common';
import { CollaborationRequestRepository } from './collaboration-request.repository';
import { CollaborationRequestDTO } from './dto/collaboration-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusType } from 'src/data/statusType.enum';
import { StudentRepository } from 'src/students/students.repository';
import { BoardsRepository } from 'src/boards/boards.repository';
import { CollaborationRequest } from './collaboration-request.entity';

@Injectable()
export class CollaborationRequestService {

    constructor(
        @InjectRepository(CollaborationRequestRepository)
        private requestRepository: CollaborationRequestRepository,
        @InjectRepository(StudentRepository)
        private stdRepository: StudentRepository,
        @InjectRepository(BoardsRepository)
        private boardsRepository: BoardsRepository,) { }


    async createRequest(data: CollaborationRequestDTO) {
        return await this.requestRepository.createReq(data);
    }


    async resolveRequest(id: string, status: StatusType) {
        const found = await this.requestRepository.findOne({ id });
        if (!found) {
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        found.status = status;
        found.save();

        if (status === StatusType.ACCEPTED) {
            const to = await this.stdRepository.findOne(found.to);
            to.sharedBoards.push(found.board);
            await to.save();
        }

        return found;
    }


    async getSentRequests(id: string) {
        const found = await this.requestRepository.find({ where: { fromUserId: id } });
        if (!found) {
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        return this.getRequestList(found);
    }


    async getReceivedRequests(id: string) {
        const found = await this.requestRepository.find({ where: { toUserId: id } });
        if (!found) {
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        return this.getRequestList(found);
    }

    async getRequestList(requests: CollaborationRequest[]): Promise<any[]> {
        const friendList = [];

        for await (const r of requests){
            const from = (await this.stdRepository.findOne(r.from)).name;
            const to = (await this.stdRepository.findOne(r.to)).name;
            const board = (await this.boardsRepository.findOne(r.board)).name; 
            friendList.push({from: from, to: to, board: board, status: r.status});
        }

        return friendList;
    }

}
