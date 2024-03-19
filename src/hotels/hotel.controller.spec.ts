/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { Hotel } from './schemas/hotels.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { JwtService, JwtModule } from '@nestjs/jwt';

describe('HotelsController', () => {
    let controller: HotelsController;
    let service: HotelsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: 'dqzdq!&FKODQJKLvEIRJ',
                    signOptions: { expiresIn: '60m' },
                }),
            ],
            controllers: [HotelsController],
            providers: [HotelsService,
                {
                    provide: getModelToken('Hotel'),
                    useValue: {
                        new: jest.fn().mockResolvedValue({}),
                        constructor: jest.fn().mockResolvedValue({}),
                        create: jest.fn().mockResolvedValue({}),
                        find: jest.fn().mockResolvedValue([]),
                        findById: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<HotelsController>(HotelsController);
        service = module.get<HotelsService>(HotelsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should get all hotels', async () => {
        const result: Hotel[] = [];
        jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));
        expect(await controller.findAll()).toBe(result);
    });

    it('should create a hotel', async () => {
        const hotel: Hotel = {
            _id: '1',
            name: 'test',
            description: 'test',
            location: 'test',
            images: ['test'],
            characteristics: ['test'],
            rooms: [{ "type": "Double", "price": 150 }],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(hotel));
        const mockImages = [{ path: 'path/to/image1.jpg' }, { path: 'path/to/image2.jpg' }];
        const mockBody = { hotelData: JSON.stringify(hotel) };

        expect(await controller.create(mockImages, mockBody)).toBe(hotel);
    });

    it('should get a hotel by id', async () => {
        const hotel: Hotel = {
            _id: '1',
            name: 'test',
            description: 'test',
            location: 'test',
            images: ['test'],
            characteristics: ['test'],
            rooms: [{ "type": "Double", "price": 150 }],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(service, 'findById').mockImplementation(() => Promise.resolve(hotel));
        expect(await controller.findById('1')).toBe(hotel);
    });

    it('should update a hotel by id', async () => {
        const hotel: Hotel = {
            _id: '1',
            name: 'test',
            description: 'test',
            location: 'test',
            images: ['test'],
            characteristics: ['test'],
            rooms: [{ "type": "Double", "price": 150 }],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const updateHotelDto: UpdateHotelDto = {
            _id: '1',
            name: 'test',
            description: 'test',
            location: 'test',
            images: ['test'],
            characteristics: ['test'],
            rooms: [{ "type": "Double", "price": 150 }],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(service, 'updateById').mockImplementation(() => Promise.resolve(hotel));
        expect(await controller.updateById('1', updateHotelDto)).toBe(hotel);
    });

    it('should delete a hotel by id', async () => {
        const hotel: Hotel = {
            _id: '1',
            name: 'test',
            description: 'test',
            location: 'test',
            images: ['test'],
            characteristics: ['test'],
            rooms: [{ "type": "Double", "price": 150 }],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(service, 'deleteById').mockImplementation(() => Promise.resolve(hotel));
        expect(await controller.deleteById('1')).toBe(hotel);
    });
});