import express from 'express'
import { ContractorController } from '../controller/contractor/contractorController'
import { authenticateToken } from '../middlewares/tokenValidation'

const router = express()

const contractorController = new ContractorController()

router.post('/newWorker', contractorController.addWorker)
      .get('/get_workers', contractorController.getWorkers)
      .post('/add_equipment', contractorController.addEquipment)
      .get('/get_equipment', contractorController.getEquipment)


export default router