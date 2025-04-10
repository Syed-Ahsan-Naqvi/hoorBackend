"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesModule = void 0;
const common_1 = require("@nestjs/common");
const notes_controller_1 = require("./notes.controller");
const notes_service_1 = require("./notes.service");
const authFetchUserData_middleware_1 = require("../middlewares/authFetchUserData.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const notes_entity_1 = require("../entities/notes.entity");
let NotesModule = class NotesModule {
    configure(consumer) {
        consumer.apply(authFetchUserData_middleware_1.LoggerMiddleware).forRoutes("/api/notes");
    }
};
exports.NotesModule = NotesModule;
exports.NotesModule = NotesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([notes_entity_1.Notes])],
        controllers: [notes_controller_1.NotesController],
        providers: [notes_service_1.NotesService],
    })
], NotesModule);
//# sourceMappingURL=notes.module.js.map