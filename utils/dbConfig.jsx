import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://expense-tracker_owner:5CQdOLzVmk7D@ep-super-scene-a5d5i1fd.us-east-2.aws.neon.tech/expense-tracker?sslmode=require');
export const db = drizzle(sql, {schema});