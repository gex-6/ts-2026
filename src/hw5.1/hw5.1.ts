abstract class BaseShape {
    public readonly color: HexColor;
    public readonly name: string;

    constructor(color: HexColor, name: string) {
        this.color = color;
        this.name = name;
    }

    public abstract calculateArea(): number;
}

class Circle extends BaseShape {
    public readonly radius: number;

    constructor(color: HexColor, name: string, radius: number) {
        super(color, name);
        this.radius = radius;
    }

    public calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
}

class Rectangle extends BaseShape implements AreaCalculatorInfo {
    public readonly sideA: number;
    public readonly sideB: number;

    constructor(color: HexColor, name: string, sideA: number, sideB: number) {
        super(color, name);
        this.sideA = sideA;
        this.sideB = sideB;
    }

    public calculateArea(): number {
        return this.sideA * this.sideB;
    }

    print(): string {
        return `sideA * sideB`;
    }
}

class Square extends BaseShape implements AreaCalculatorInfo {
    public readonly side: number;

    constructor(color: HexColor, name: string, side: number) {
        super(color, name);
        this.side = side;
    }

    public calculateArea(): number {
        return this.side * this.side;
    }

    print(): string {
        return `side ^ 2`;
    }
}

class Triangle extends BaseShape {
    public readonly mainSide: number;
    public readonly height: number;

    constructor(color: HexColor, name: string, mainSide: number, height: number) {
        super(color, name);
        this.mainSide = mainSide;
        this.height = height;
    }

    public calculateArea(): number {
        return 0.5 * this.mainSide * this.height;
    }
}


// helpers
type HexColor = `#${string}`;

interface AreaCalculatorInfo {
    print(): string;
}