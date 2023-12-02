import {Directory, problem1, problem2, Program} from "../problemSolver";
import {data} from "../data";

describe('day 07', function () {
    const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

    describe('program', function () {
        describe('given cd command', function () {
            it('should change directory', function () {
                const program = new Program('$ cd /')
                program.run()
                expect(program.cwd).toEqual('/')
            });
            it('should go up a directory', function () {
                const program = new Program(`$ cd /
                $ cd a
                $ cd b
                $ cd ..`)

                program.run()

                expect(program.cwd).toEqual('/a')
            });
        });

        describe('given ls', function () {

            it('should set current line to next line after listing', function () {
                const program = new Program(`$ cd /
                $ ls
                dir a
                14848514 b.txt
                $ cd a`)

                program.run()

                expect(program.cwd).toEqual('/a')
                expect(program.currentLine).toEqual(5)
            });

            it('should track files at top level', function () {
                const program = new Program(`$ cd /
                $ ls
                dir a
                14848514 b.txt
                $ cd a`)

                program.run()

                const textFile = program.fileSystem.root.contents.find(item => item.name === 'b.txt');
                const directory = program.fileSystem.root.contents.find(item => item.name === 'a');

                expect(textFile).toHaveProperty('size', 14848514)
                expect(directory).toHaveProperty('path', '/a')
            });

            it('should track files recursively to one level', function () {
                const program = new Program(`$ cd /
                $ ls
                dir a
                14848514 b.txt
                $ cd a
                $ ls
                250 secondLevelFile.txt`)

                program.run()

                const parentDirectoryForSecondFile = program.fileSystem.root.contents.find(item => item.name === 'a') as Directory;
                const secondTextFile = parentDirectoryForSecondFile.contents.find(item => item.name === 'secondLevelFile.txt')

                expect(secondTextFile).toHaveProperty('size', 250)
            });

            it('should track files recursively to 4 levels', function () {
                const program = new Program(`$ cd /
                $ ls
                dir a
                14848514 b.txt
                $ cd a
                $ ls
                dir b
                250 secondLevelFile.txt
                $ cd b
                $ ls
                dir c
                500 thirdLevelFile.txt
                $ cd c
                $ ls
                dir d
                1000 fourthLevelFile.txt`)

                program.run()

                const parentDirectoryForFourthFile = program.fileSystem.findParentDirectory('/a/b/c/fourthFile.txt') as Directory;
                const fourthTextFile = parentDirectoryForFourthFile.contents.find(item => item.name === 'fourthLevelFile.txt')

                expect(fourthTextFile).toHaveProperty('size', 1000)
            });
        });

        describe('calculate dir size', function () {
            it('should calculate directory size for flat dir', function () {
                const program = new Program(`$ cd /
                $ ls
                1234 foo.txt`)

                program.run()

                expect(program.fileSystem.getDirectorySize('/')).toEqual(1234)
            });

            it('should calculate directory size for nested dir', function () {
                const program = new Program(`$ cd /
                $ ls
                dir a
                $ cd a
                $ ls
                dir b
                $ cd b
                $ ls
                1234 foo.txt`)

                program.run()

                expect(program.fileSystem.getDirectorySize('/a/b')).toEqual(1234)
            });

            it('should total up all files', function () {
                const program = new Program(`$ cd /
                $ ls
                dir a
                100 file1
                $ cd a
                $ ls
                dir b
                200 file2
                $ cd b
                $ ls
                300 foo.txt`)

                program.run()

                expect(program.fileSystem.getDirectorySize('/')).toEqual(600)
                expect(program.fileSystem.getDirectorySize('/a')).toEqual(500)
                expect(program.fileSystem.getDirectorySize('/a/b')).toEqual(300)
            });
        });
    });

    describe('problem 1', function () {
        describe('sortDirsBySize', function () {
            it('should sort directories by size', function () {
                const program = new Program(`$ cd /
                $ ls
                dir a
                100 file1
                $ cd a
                $ ls
                dir b
                dir c
                200 file2
                $ cd b
                $ ls
                400 file3.txt
                $ cd ..
                $ cd c
                $ ls
                500 file4.txt`)

                program.run()

                let sortDirsBySize = program.fileSystem.sortDirsBySize();
                expect(sortDirsBySize.map(dir => dir.dir.path)).toEqual([
                    '/',
                    '/a',
                    '/a/c',
                    '/a/b',
                ])
            });
        });
        it('should filter all directories under the amount and total them up', function () {
            const testResult = problem1(testInput)

            expect(testResult).toEqual(95437)
        });

        it('should solve the problem', function () {
            const result = problem1(data)

            expect(result).toEqual(0)
        })
    });

    describe('problem 2', function () {
        it('should find the size of the smallest deletable directory' , function () {
            const testResult = problem2(testInput)

            expect(testResult).toEqual(24933642)
        })

        it('should solve the problem', function () {
            const program = new Program(testInput)
            program.run()

            const files  = program.fileSystem.sortDirsBySize()

            expect(files[0].size).toEqual(48381165)
        })
        it('should work for large dataset', function () {
            const result = problem2(data)

            expect(result).toEqual(4370655)
        });
    })

});
