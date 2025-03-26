import express from 'express'
import { ProjectController } from '../controller/contractor/project/projectController'
import { authenticateToken } from '../middlewares/tokenValidation'
import { WorkerController } from '../controller/contractor/worker/workerController'
import { EquipmentController } from '../controller/contractor/equipment/equipmentController'

const router = express()

const projectController = new ProjectController()
const workerController = new WorkerController()
const equipmentController = new EquipmentController()

router.post('/newWorker', authenticateToken, workerController.addWorker)
      .get('/get_workers', authenticateToken, workerController.getWorkers)

      .post('/add_equipment', authenticateToken, equipmentController.addEquipment)
      .get('/get_equipment', authenticateToken, equipmentController.getEquipment)

      .post('/new_project', authenticateToken, projectController.newProject)
      .get('/get_projects', authenticateToken, projectController.getProjects)
      .get('/get_single_project/:_id', authenticateToken, projectController.getSingleProject)
      .post('/add_task/:projectId', authenticateToken, projectController.addTask)
      .get('/get_available_equipment', authenticateToken, projectController.getAvailableEquipment)
      .get('/get_taskEquipment/:projectId', authenticateToken, projectController.getProjectEquipment)
      .patch('/equipment_actions', authenticateToken, projectController.equipmentAction)
      .patch('/change_project_status', authenticateToken, projectController.changeProjectStatus)
      .patch('/change_task_status', authenticateToken, projectController.changeTaskStatus)
      .get('/get_single_task/:_id', authenticateToken, projectController.getSingleTask)
      .post('/check_equipment_count', authenticateToken, projectController.checkEquipmentCount)
      
      
export default router