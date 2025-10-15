import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type { Property, Tenant, EntityBase } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILES = {
  properties: path.join(DATA_DIR, "properties.json"),
  tenants: path.join(DATA_DIR, "tenants.json"),
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(file: string): Promise<T[]> {
  try {
    await ensureDataDir();
    const buf = await fs.readFile(file, "utf-8");
    return JSON.parse(buf) as T[];
  } catch (e: any) {
    if (e.code === "ENOENT") {
      return [] as T[];
    }
    throw e;
  }
}

async function writeJsonFile<T>(file: string, data: T[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

function nowIso() {
  return new Date().toISOString();
}

function createEntity<T extends object>(payload: T): T & EntityBase {
  const ts = nowIso();
  return {
    id: randomUUID(),
    createdAt: ts,
    updatedAt: ts,
    ...(payload as any),
  };
}

function updateEntity<T extends EntityBase>(entity: T, payload: Partial<T>): T {
  return { ...entity, ...payload, updatedAt: nowIso() };
}

export const propertyStore = {
  async list(): Promise<Property[]> {
    return readJsonFile<Property>(FILES.properties);
  },
  async get(id: string): Promise<Property | undefined> {
    const list = await this.list();
    return list.find((p) => p.id === id);
  },
  async create(
    input: Omit<Property, keyof EntityBase | "id"> & Partial<EntityBase>,
  ): Promise<Property> {
    const list = await this.list();
    const entity = createEntity<Omit<Property, keyof EntityBase>>(
      input as any,
    ) as Property;
    list.push(entity);
    await writeJsonFile(FILES.properties, list);
    return entity;
  },
  async update(
    id: string,
    input: Partial<Property>,
  ): Promise<Property | undefined> {
    const list = await this.list();
    const idx = list.findIndex((p) => p.id === id);
    if (idx < 0) return undefined;
    const updated = updateEntity<Property>(list[idx], input as any);
    list[idx] = updated;
    await writeJsonFile<Property>(FILES.properties, list);
    return updated;
  },
  async remove(id: string): Promise<boolean> {
    const list = await this.list();
    const newList = list.filter((p) => p.id !== id);
    const removed = newList.length !== list.length;
    if (removed) await writeJsonFile<Property>(FILES.properties, newList);
    return removed;
  },
};

export const tenantStore = {
  async list(): Promise<Tenant[]> {
    return readJsonFile<Tenant>(FILES.tenants);
  },
  async get(id: string): Promise<Tenant | undefined> {
    const list = await this.list();
    return list.find((t) => t.id === id);
  },
  async create(
    input: Omit<Tenant, keyof EntityBase | "id"> & Partial<EntityBase>,
  ): Promise<Tenant> {
    const list = await this.list();
    const entity = createEntity<Omit<Tenant, keyof EntityBase>>(
      input as any,
    ) as Tenant;
    list.push(entity);
    await writeJsonFile(FILES.tenants, list);
    return entity;
  },
  async update(
    id: string,
    input: Partial<Tenant>,
  ): Promise<Tenant | undefined> {
    const list = await this.list();
    const idx = list.findIndex((t) => t.id === id);
    if (idx < 0) return undefined;
    const updated = updateEntity<Tenant>(list[idx], input as any);
    list[idx] = updated;
    await writeJsonFile<Tenant>(FILES.tenants, list);
    return updated;
  },
  async remove(id: string): Promise<boolean> {
    const list = await this.list();
    const newList = list.filter((t) => t.id !== id);
    const removed = newList.length !== list.length;
    if (removed) await writeJsonFile<Tenant>(FILES.tenants, newList);
    return removed;
  },
};
