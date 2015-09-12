module asteroids.systems {
    export enum SystemPriorities {
        unknown,
        preUpdate,
        update,
        move,
        resolveCollisions,
        stateMachines,
        animate,
        render
    }
}
