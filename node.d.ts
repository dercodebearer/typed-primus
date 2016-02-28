// Typings by https://github.com/japhar81 and https://github.com/dercodebearer
import http = require('http');
import net = require('net');

declare class Primus {
    socket: net.Socket;
    static connect(url: string, options?: Primus.PrimusConnectOptions): Primus;
    constructor();
    constructor(server: http.Server, options?: Primus.PrimusOptions);
    library(): void;
    open(): void;
    write(data: any): void;
    on(event: string, cb: (spark: Primus.Spark) => void): void;
    end(): void;
    destroy(): void;
    emits(event: string, parser: (next: any, parser: any) => void): void;
    id(cb: (id: any) => void): void;
    createSocket(options?: Primus.PrimusOptions): net.Socket;
    authorize(req: http.ClientRequest, done: () => void): void;
    forEach(cb: (spark: Primus.Spark, id: string, connections: any) => void): void;
    before(event: string, cb: () => void): void;
    before(event: string, cb: (req: http.ClientRequest, res: http.ServerResponse) => void): void;
    before(event: string, cb: (req: http.ClientRequest, res: http.ServerResponse, next: any) => void): void;
    remove(name: string): void;
    enable(name: string): void;
    disable(name: string): void;
    use(name: string, plugin: Object): void;
    transform(event: string, cb: (packet: any) => void): void;
    transforms(event: string, parser: (packet: any, next: any) => void): void;
    spark(id: string): Primus.Spark;
}

declare namespace Primus {
    export interface PrimusOptions {
        authorization?: Function;
        pathname?: string;
        parser?: string;
        transformer?: string;
        plugin?: Object;
        timeout?: number;
        global?: string;
        compression?: boolean;
        origins?: string;
        methods?: string;
        credentials?: boolean;
        maxAge?: string;
        headers?: boolean;
        exposed?: boolean;
        strategy?: any;
    }

    export interface PrimusConnectOptions {
        timeout?: number;
        ping?: number;
        pong?: number;
        strategy?: string;
        manual?: boolean;
        websockets?: boolean;
        network?: boolean;
        transport?: any;
        queueSize?: any;
        reconnect?: {
            max?: any;
            min?: number;
            retries?: number;
            factor?: number;
        };
    }

    export interface Spark {
        headers: any[];
        address: string;
        query: string;
        id: string;
        request: http.ClientRequest;

        write(data: any): void;
        end(data?: any, options?: Object): void;
        emits(event: string, parser: (next: any, parser: any) => void): void; // might be better tied to a TSD for https://github.com/primus/emits
        on(event: string, cb: (data: any) => void): void;
    }
}

export = Primus;
