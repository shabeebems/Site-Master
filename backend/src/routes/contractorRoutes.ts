import express from 'express'
import { ContractorController } from '../controller/contractor/contractorController'
import { authenticateToken } from '../middlewares/tokenValidation'

const router = express()

const contractorController = new ContractorController()

router.post('/newWorker', authenticateToken, contractorController.addWorker)
      .get('/get_workers', authenticateToken, contractorController.getWorkers)
      .post('/add_equipment', authenticateToken, contractorController.addEquipment)
      .get('/get_equipment', authenticateToken, contractorController.getEquipment)
      .post('/new_project', authenticateToken, contractorController.newProject)
      

export default router