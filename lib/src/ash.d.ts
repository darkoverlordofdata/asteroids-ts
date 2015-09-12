/**
 *--------------------------------------------------------------------+
 * ash.d.ts
 *--------------------------------------------------------------------+
 * Copyright DarkOverlordOfData (c) 2015
 *--------------------------------------------------------------------+
 *
 * This file is a part of ash.coffee
 *
 * ash.coffee is free software; you can copy, modify, and distribute
 * it under the terms of the MIT License
 *
 *--------------------------------------------------------------------+
 *
 */
interface Dictionary {
    [key: string]: any;
}
declare module ash {
    module signals {
        class ListenerNode {
            previous: ListenerNode;
            next: ListenerNode;
            listener: Function;
            once: boolean;
        }
    }
}
declare module ash {
    module signals {
        class ListenerNodePool {
            tail: ListenerNode;
            cacheTail: ListenerNode;
            get(): ListenerNode;
            dispose(node: ListenerNode): void;
            cache(node: ListenerNode): void;
            releaseCache(): void;
        }
    }
}
declare module ash {
    module signals {
        class SignalBase {
            head: ListenerNode;
            tail: ListenerNode;
            numListeners: number;
            keys: any;
            nodes: any;
            listenerNodePool: ListenerNodePool;
            toAddHead: ListenerNode;
            toAddTail: ListenerNode;
            dispatching: boolean;
            constructor();
            startDispatch(): void;
            endDispatch(): void;
            getNode(listener: Function): void;
            add(listener: Function): void;
            addOnce(listener: Function): void;
            addNode(node: ListenerNode): void;
            remove(listener: Function): void;
            removeAll(): void;
        }
    }
}
declare module ash {
    module signals {
        class Signal0 extends SignalBase {
            dispatch(): void;
        }
    }
}
declare module ash {
    module signals {
        class Signal1 extends SignalBase {
            dispatch($1: any): void;
        }
    }
}
declare module ash {
    module signals {
        class Signal2 extends SignalBase {
            dispatch($1: any, $2: any): void;
        }
    }
}
declare module ash {
    module signals {
        class Signal3 extends SignalBase {
            dispatch($1: any, $2: any, $3: any): void;
        }
    }
}
declare module ash {
    module core {
        class Entity {
            private static nameCount;
            _name: string;
            componentAdded: ash.signals.Signal2;
            componentRemoved: ash.signals.Signal2;
            nameChanged: ash.signals.Signal2;
            previous: Entity;
            next: Entity;
            components: any;
            constructor(name?: string);
            name: string;
            add(component: Object, componentClass?: any): Entity;
            remove(componentClass: any): void;
            get(componentClass: any): any;
            getAll(): any;
            has(componentClass: any): boolean;
        }
    }
}
declare module ash {
    module core {
        class EntityList {
            head: Entity;
            tail: Entity;
            add(entity: Entity): void;
            remove(entity: Entity): void;
            removeAll(): void;
        }
    }
}
declare module ash {
    module core {
        class Node {
            entity: Entity;
            previous: any;
            next: any;
        }
    }
}
declare module ash {
    module core {
        class NodeList {
            head: any;
            tail: any;
            nodeAdded: ash.signals.Signal1;
            nodeRemoved: ash.signals.Signal1;
            constructor();
            add(node: Node): void;
            remove(node: Node): void;
            removeAll(): void;
            isEmpty(): boolean;
            swap(node1: any, node2: any): void;
            insertionSort(sortFunction: any): void;
            mergeSort(sortFunction: Function): void;
            merge(head1: Node, head2: Node, sortFunction: Function): any;
        }
    }
}
declare module ash {
    module core {
        class NodePool {
            tail: Node;
            nodeClass: any;
            cacheTail: Node;
            components: Dictionary;
            constructor(nodeClass: any, components: Dictionary);
            get(): Node;
            dispose(node: Node): void;
            cache(node: Node): void;
            releaseCache(): void;
        }
    }
}
declare module ash {
    module core {
        class System {
            previous: System;
            next: System;
            priority: number;
            addToEngine(engine: Engine): void;
            removeFromEngine(engine: Engine): void;
            update(time: number): void;
        }
    }
}
declare module ash {
    module core {
        class SystemList {
            head: System;
            tail: System;
            add(system: System): void;
            remove(system: System): void;
            removeAll(): void;
            get(type: any): System;
        }
    }
}
declare module ash {
    module core {
        interface IFamily {
            newEntity(entity: Entity): void;
            removeEntity(entity: Entity): void;
            componentAddedToEntity(entity: Entity, componentClass: any): void;
            componentRemovedFromEntity(entity: Entity, componentClass: any): void;
            cleanUp(): void;
        }
    }
}
declare module ash {
    module core {
        class ComponentMatchingFamily implements IFamily {
            nodes: NodeList;
            entities: Dictionary;
            nodeClass: any;
            components: Dictionary;
            nodePool: NodePool;
            engine: Engine;
            constructor(nodeClass: any, engine: Engine);
            init(): void;
            nodeList: NodeList;
            newEntity(entity: Entity): void;
            componentAddedToEntity(entity: Entity, componentClass: any): void;
            componentRemovedFromEntity(entity: Entity, componentClass: any): void;
            removeEntity(entity: Entity): void;
            addIfMatch(entity: Entity): void;
            removeIfMatch(entity: Entity): void;
            releaseNodePoolCache(): void;
            cleanUp(): void;
        }
    }
}
declare module ash {
    module core {
        class Engine {
            entityNames: Dictionary;
            entityList: EntityList;
            systemList: SystemList;
            families: Dictionary;
            updating: boolean;
            updateComplete: ash.signals.Signal0;
            familyClass: typeof ComponentMatchingFamily;
            constructor();
            entities: Entity[];
            systems: System[];
            addEntity(entity: Entity): void;
            removeEntity(entity: Entity): void;
            entityNameChanged(entity: any, oldName: any): void;
            getEntityByName(name: string): Entity;
            removeAllEntities(): void;
            componentAdded(entity: Entity, componentClass: any): void;
            componentRemoved(entity: Entity, componentClass: any): void;
            getNodeList(nodeClass: any): NodeList;
            releaseNodeList(nodeClass: any): void;
            addSystem(system: System, priority: number): void;
            getSystem(type: any): System;
            removeSystem(system: System): void;
            removeAllSystems(): void;
            update(time: number): void;
        }
    }
}
declare module ash {
    module ext {
        class Helper {
            components: any;
            nodes: any;
            constructor(components: any, nodes: any);
        }
    }
}
declare module ash {
    module fsm {
        class ComponentInstanceProvider {
            private instance;
            constructor(instance: any);
            getComponent(): any;
            identifier: any;
        }
    }
}
declare module ash {
    module fsm {
        class ComponentSingletonProvider {
            componentType: any;
            instance: any;
            constructor(type: any);
            getComponent(): any;
            identifier: any;
        }
    }
}
declare module ash {
    module fsm {
        class ComponentTypeProvider {
            componentType: any;
            constructor(type: any);
            getComponent(): any;
            identifier: any;
        }
    }
}
declare module ash {
    module fsm {
        class DynamicComponentProvider {
            _closure: any;
            constructor(closure: any);
            getComponent(): any;
            identifier: any;
        }
    }
}
declare module ash {
    module fsm {
        class DynamicSystemProvider {
            method(): void;
            systemPriority: number;
            constructor(method: any);
            getSystem(): void;
            identifier: () => void;
            priority: number;
            function: any;
        }
    }
}
declare module ash {
    module fsm {
        class EngineState {
            providers: any;
            constructor();
            addInstance(system: any): any;
            addSingleton(type: any): any;
            addMethod(method: any): any;
            addProvider(provider: any): any;
        }
    }
}
declare module ash {
    module fsm {
        class StateComponentMapping {
            componentType: any;
            creatingState: any;
            provider: any;
            constructor(creatingState: any, type: any);
            withInstance(component: any): StateComponentMapping;
            withType(type: any): StateComponentMapping;
            withSingleton(type?: any): StateComponentMapping;
            withMethod(method: any): StateComponentMapping;
            withProvider(provider: any): StateComponentMapping;
            add(type: any): any;
            setProvider(provider: any): any;
        }
    }
}
declare module ash {
    module fsm {
        class EngineStateMachine {
            engine: any;
            states: any;
            currentState: any;
            constructor(engine: any);
            addState(name: any, state: any): EngineStateMachine;
            createState(name: any): EngineStateMachine;
            changeState(name: any): any;
        }
    }
}
declare module ash {
    module fsm {
        class EntityState {
            providers: any;
            constructor();
            add(type: any): StateComponentMapping;
            get(type: any): any;
            has(type: any): boolean;
        }
    }
}
declare module ash {
    module fsm {
        class EntityStateMachine {
            states: any;
            currentState: any;
            entity: any;
            constructor(entity: any);
            addState(name: any, state: any): EntityStateMachine;
            createState(name: any): any;
            changeState(name: any): any;
        }
    }
}
declare module ash {
    module fsm {
        class StateSystemMapping {
            creatingState: any;
            provider: any;
            constructor(creatingState: any, provider: any);
            withPriority(priority: any): StateSystemMapping;
            addInstance(system: any): any;
            addSingleton(type: any): any;
            addMethod(method: any): any;
            addProvider(provider: any): any;
        }
    }
}
declare module ash {
    module fsm {
        class SystemInstanceProvider {
            instance: any;
            systemPriority: number;
            constructor(instance: any);
            getSystem(): any;
            identifier: any;
            priority: number;
        }
    }
}
declare module ash {
    module fsm {
        class SystemSingletonProvider {
            componentType: any;
            instance: any;
            systemPriority: number;
            constructor(type: any);
            getSystem(): any;
            identifier: any;
            priority: number;
        }
    }
}
declare module ash {
    module tick {
        class FrameTickProvider extends ash.signals.Signal1 {
            displayObject: any;
            previousTime: number;
            maximumFrameTime: number;
            isPlaying: boolean;
            request: any;
            timeAdjustment: number;
            constructor(displayObject: any, maximumFrameTime: any);
            playing: boolean;
            start(): void;
            stop(): void;
            dispatchTick(timestamp?: any): void;
        }
    }
}
declare module ash {
    module tools {
        class ComponentPool {
            private static pools;
            private static getPool(componentClass);
            static get(componentClass: any): any;
            static dispose(component: any): void;
            static empty(): void;
        }
    }
}
declare module ash {
    module tools {
        class ListIteratingSystem extends ash.core.System {
            nodeList: ash.core.NodeList;
            nodeClass: any;
            constructor(nodeClass: Function);
            nodeUpdateFunction: Function;
            nodeAddedFunction: Function;
            nodeRemovedFunction: Function;
            addToEngine(engine: ash.core.Engine): void;
            removeFromEngine(engine: ash.core.Engine): void;
            update(time: number): void;
        }
    }
}

