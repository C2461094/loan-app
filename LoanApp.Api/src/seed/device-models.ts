import { getDeviceModelRepo } from "../config/appServices";
import { DeviceModelProps } from "../domain/device-model";

export const testDeviceModels: DeviceModelProps[] = [
    {
        id: 'macbook-pro-2020',
        brand: 'Apple',
        modelName: 'MacBook Pro 2020',
        category: 'Laptop',
        description: '13-inch, 16GB RAM, 512GB SSD',
        stock: 5,
        createdAt: new Date(),
    },
    {
        id: 'dell-xps-13',
        brand: 'Dell',
        modelName: 'XPS 13',
        category: 'Laptop',
        description: '13.3-inch, 16GB RAM, 512GB SSD',
        stock: 5,
        createdAt: new Date(),
    },
    {
        id: 'ipad-air-4',
        brand: 'Apple',
        modelName: 'iPad Air 4',
        category: 'Tablet',
        description: '10.9-inch, 64GB, Wi-Fi',
        stock: 10,
        createdAt: new Date(),
    },
    {
        id: 'samsung-galaxy-tab-s7',
        brand: 'Samsung',
        modelName: 'Galaxy Tab S7',
        category: 'Tablet',
        description: '11-inch, 128GB, Wi-Fi',
        stock: 8,
        createdAt: new Date(),
    },
    {
        id: 'canon-eos-r5', 
        brand: 'Canon',
        modelName: 'EOS R5',
        category: 'Camera',
        description: '45MP Full-Frame Mirrorless Camera',
        stock: 3,
        createdAt: new Date(),
    },
    {
        id: 'sony-a7-iii',
        brand: 'Sony',
        modelName: 'Alpha a7 III',
        category: 'Camera',
        description: '24MP Full-Frame Mirrorless Camera',
        stock: 4,
        createdAt: new Date(),
    },
];

async function seedDeviceModels() {
    const repo = getDeviceModelRepo();

    for ( const device of testDeviceModels) {
        await repo.create(device);
    }

    console.log('Seeded device models');
}

seedDeviceModels().catch((error) => {
    console.error('Error seeding device models:', error);
});

