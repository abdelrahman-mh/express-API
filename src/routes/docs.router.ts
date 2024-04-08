import path from 'path';
import express from 'express';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();
const openApiPath = path.resolve(__dirname, '../../openapi.yaml');

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const openApiSpec = YAML.load(openApiPath);

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
router.get('/docs', swaggerUi.setup(openApiSpec));

export default router;
