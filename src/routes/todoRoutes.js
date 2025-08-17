import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await prisma.todos.findMany({
        where: {
            userId: req.userId,
        },
    });
    res.json(todos);
});

router.post('/', async (req, res) => {
    const { task } = req.body;

    const todo = await prisma.todos.create({
        data: {
            task,
            userId: req.userId,
        },
    });

    res.json(todo);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    const updateTodo = prisma.todos.update({
        where: {
            id: parseInt(id),
            userId: req.userId,
        },
        data: {
            completed: !!completed,
        },
    });

    res.json(updateTodo);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    console.log(id, userId);

    await prisma.todos.delete({
        where: {
            id: parseInt(id),
            userId,
        },
    });
    res.json({ message: 'Todo deleted ' });
});

export default router;
