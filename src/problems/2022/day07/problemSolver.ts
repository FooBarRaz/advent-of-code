type Action<T> = {
    type: string
    payload: T
}

type State = {

}

type FileType = 'file' | 'directory'

abstract class Item  {
    constructor(public name: string, public path: string, type: FileType) {
    }
}

class File extends Item {
    constructor(
        public name: string,
        public path: string,
        public size?: number,
    ) {
        super(name, path, 'file')
    }
}

export class Directory extends Item {
    constructor(
        public name: string,
        public path: string,
        public contents: Item[]
    ) {
        super(name, path, 'directory')
    }
}

class FileSystem  {
    private _flatList: Item[] = []
    constructor(public root: Directory) {
        this._flatList.push(root)
    }

    addItemAtPath(item: Item): void {
        const directory = this.findParentDirectory(item.path);
        this._flatList.push(item)
        directory.contents.push(item)
    }

    findParentDirectory(path: string): Directory {
        const parentDirs = path.split('/').filter(part => part !== '').slice(0, -1)
        let currentDir: Directory = this.root
        if(path === '/' || parentDirs.every(dir => dir === '')) {
            return currentDir
        }


        while(parentDirs.length) {
            const dir = parentDirs.shift()
            currentDir = currentDir.contents.find(x => x.name === dir) as Directory
        }
        return currentDir as Directory
    }

    findItem(path: string): Item {
        // const parts = path.split('/').filter(part => part !== '')
        // let currentDir: Directory = this.root
        // while(parts.length) {
        //     const part = parts.shift()
        //     currentDir = currentDir.contents.find(x => x.name === part) as Directory
        // }
        // return currentDir as Item
        return this._flatList.find(item => item.path === path)
    }

    getDirectorySize(dir: string) {
        const directory = this.findItem(dir) as Directory
        return directory.contents.reduce((acc, item) => {
            if (item instanceof File) {
                return acc + item.size
            } else {
                return acc + this.getDirectorySize(`${item.path}`)
            }
        }, 0)
    }

    sortDirsBySize() {
        const dirs = this._flatList.filter(item => item instanceof Directory)
        return dirs.map(dir => {
            const size = this.getDirectorySize(dir.path)
            return { dir, size }
        }).sort((a, b) => b.size - a.size)
    }
}

export class Program {
    private _currentLine: number;
    private readonly _fileSystem: FileSystem;
    private _cwd: string;
    private readonly program: string[];
    constructor(rawOutput: string) {
        this._currentLine = 0
        this._fileSystem = new FileSystem(new Directory('root', '/', []))
        this._cwd = ''
        this.program = rawOutput.split('\n')
    }

    get cwd() {
        return this._cwd
    }

    get currentLine() {
        return this._currentLine
    }

    get fileSystem() {
        return this._fileSystem
    }

    run() {
        while(this._currentLine < this.program.length) {
            this.runLine()
        }
    }

    runLine() {
        const line = this.program[this._currentLine].trim()
        if(this.isCommand(line)) {
            const [command, ...args] = line.slice(2).split(' ')
            if(command === 'cd') {
                this.cd(args);
            }
            if (command === 'ls') {
                this.ls();
            }
        }
        this._currentLine++
    }

    private isCommand(line: string) {
        return line.startsWith('$')
    }

    private ls() {
        while (this.program[this._currentLine + 1] && !this.isCommand(this.program[this._currentLine + 1].trim())) {
            const line = this.program[this._currentLine + 1].trim()
            const [typeOrSize, name] = line.split(' ')
            const path = `${this._cwd}${this._cwd === '/' ? '': '/'}${name}`
            const file = typeOrSize === 'dir' ? new Directory(name, path, [])
                : new File(name, path, +typeOrSize);

            this._fileSystem.addItemAtPath(file);

            this._currentLine++
        }
    }

    private cd(args: string[]) {
        const [directory] = args
        if (directory == '..') {
            this._cwd = this._cwd.split('/').slice(0, -1).join('/')
        } else if (directory == '/') {
            this._cwd = '/'
        } else {
            if (this._cwd === '/') {
                this._cwd = `${this._cwd}${directory}`
            } else {
                this._cwd = `${this._cwd}/${args[0]}`
            }
        }
    }
}

export const problem1 = (input: string): number => {
    const program = new Program(input)
    program.run()
    const dirs = program.fileSystem.sortDirsBySize()
    return dirs.filter(dir => dir.size <= 100000).reduce((acc, dir) => acc + dir.size, 0)
}

export const problem2 = (input: string): number => {
    const program = new Program(input)
    program.run()
    const [root, ...rest] = program.fileSystem.sortDirsBySize()
    const currentlyAvailableSpace = TOTAL_SPACE_AVAILABLE - root.size
    const spaceWeNeedToFreeUp = SPACE_NEEDED_FOR_UPDATE - currentlyAvailableSpace
    return rest.find((dir, index) => dir.size >= spaceWeNeedToFreeUp && rest[index +1]?.size < spaceWeNeedToFreeUp).size
}

export const TOTAL_SPACE_AVAILABLE = 70000000
export const SPACE_NEEDED_FOR_UPDATE = 30000000