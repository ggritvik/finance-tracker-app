import { pgTable, serial, varchar, numeric, integer } from "drizzle-orm/pg-core";
//import { integer } from "drizzle-orm";

export const Budgets = pgTable("budgets", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: varchar("amount").notNull(),
    icon: varchar("icon"),
    createdBy: varchar("createdBy").notNull(),
});

export const Expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: numeric("amount").notNull().default(0),
    budgetId: integer("budgetId").references(() => Budgets.id),
    createdBy: varchar("createdBy").notNull()    
})