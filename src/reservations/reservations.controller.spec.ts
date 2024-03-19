import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        ReservationsService,
        {
          provide: getModelToken('Reservation'),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn(),
        },
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all reservations', async () => {
    const result: any[] = [];
    jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));
    expect(await controller.findAll()).toBe(result);
  });

  it('should create a reservation', async () => {
    const req = {
      headers: {
        authorization: 'Bearer test_token',
      },
    };
    const createReservation = {
      _id: '',
      userId: '',
      hotelId: '',
      hotelName: '',
      rooms: [],
      price: 0,
      checkIn: '',
      checkOut: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const payload = { sub: 'user_id' };

    jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
    jest.spyOn(service, 'create').mockImplementation();

    await controller.create(req as any, createReservation);

    expect(service.create).toHaveBeenCalledWith(createReservation);
  });

  it('should get all user reservations', async () => {
    const req = {
     headers: {
        authorization: 'Bearer test_token',
      }
    };
    const payload = { sub: 'user_id' };
    const result: any[] = [];

    jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
    jest.spyOn(service, 'findAllUserReservations').mockImplementation(() => Promise.resolve(result));

    await controller.findAllUserReservations(req as any);

    expect(service.findAllUserReservations).toHaveBeenCalledWith(payload.sub);
  });


  it('should find one reservation', async () => {
    const req = {
      headers: {
        authorization: 'Bearer test_token',
      },
    };
    const id = 'reservation_id';
    const payload = { sub: 'user_id' };
    const result: any = {
      _id: id,
      userId: payload.sub,
      hotelId: '',
      hotelName: '',
      rooms: [],
      price: 0,
      checkIn: '',
      checkOut: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
    jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(result));
    await controller.findOne(req as any, id);
    expect(service.findOne).toHaveBeenCalledWith(id, payload.sub);
  });

  it('should remove one reservation', async () => {
    const req = {
      headers: {
        authorization: 'Bearer test_token',
      },
    };
    const id = 'reservation_id';
    const payload = { sub: 'user_id' };
    const result: any = {
      _id: id,
      userId: payload.sub,
      hotelId: '',
      hotelName: '',
      rooms: [],
      price: 0,
      checkIn: '',
      checkOut: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    jest.spyOn(jwtService, 'verify').mockReturnValue(payload);
    jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve(result));
    await controller.remove(req as any, id);
    expect(service.remove).toHaveBeenCalledWith(id, payload.sub);
  });
});
