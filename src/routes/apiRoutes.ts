import { Router } from 'express';
import { HomeController } from '../controllers/homeController';
import { ProjectController } from '../controllers/projectController';
import { EventController } from '../controllers/eventController';
import { MemberController } from '../controllers/memberController';
import { EquipmentController } from '../controllers/equipmentController';
import { TestController } from '../controllers/testController';
import UserController from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';
import { UserRole } from '../types';

const router = Router();
const homeController = new HomeController();
const projectController = new ProjectController();
const eventController = new EventController();
const memberController = new MemberController();
const equipmentController = new EquipmentController();
const testController = new TestController();
const userController = new UserController();

// 首页
router.get('/', homeController.home);

// 用户认证路由
router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);

// 用户管理路由
router.get('/users', authMiddleware(UserRole.HUIZHANG), userController.getAllUsers);
router.get('/users/:id', authMiddleware(), userController.getUser);
router.put('/users/:userId/role', authMiddleware(UserRole.HUIZHANG), userController.updateUserRole);
router.delete('/users/:id', authMiddleware(UserRole.HUIZHANG), userController.deleteUser);

// API路由
router.get('/api/projects', projectController.getProjects);
router.get('/api/projects/:project_id', projectController.getProject);
router.post('/api/projects', authMiddleware(UserRole.HUIYUAN), projectController.createProject);

router.get('/api/events', eventController.getEvents);
router.get('/api/events/:event_id', eventController.getEvent);

router.get('/api/members', memberController.getMembers);
router.get('/api/members/:member_id', memberController.getMember);

router.get('/api/equipment', equipmentController.getEquipment);
router.get('/api/equipment/:equipment_id', equipmentController.getEquipmentById);

router.post('/api/test/generate-project', testController.generateTestProject);

export default router;
