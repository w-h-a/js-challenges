var triangle = require('./triangles.js').triangle;

describe("Triangles", function() {
  describe("Non-Triangle Input", function() {
    test("if any side is 0, then not triangle", function() {
      expect(function() {
        triangle(0, 5, 1);
      }).toThrow();
    });

    test("if any side is negative, then not triangle", function() {
      expect(function() {
        triangle(3, 4, -5);
      }).toThrow();
    });

    test("triangles may not violate triangle inequality 1", function() {
      expect(function() {
        triangle(1, 1, 3);
      }).toThrow();
    });

    test("triangles may not violate trianlge inequality 2", function() {
      expect(function() {
        triangle(7, 3, 2);
      }).toThrow();
    });
  });

  describe("Degenerates", function() {
    test("two shortest sides add up to third 1", function() {
      var tri = triangle(1, 1, 2);
      expect(tri.kind()).toBe("(at least) degenerate");
    });

    test("two shortest sides add up to third 2", function() {
      var tri = triangle(3, 1.5, 1.5);
      expect(tri.kind()).toBe("(at least) degenerate");
    });

    test("two shortest sides add up to third 3", function() {
      var tri = triangle(2, 6, 4);
      expect(tri.kind()).toBe("(at least) degenerate");
    });

    test("two shortest sides add up to third 4", function() {
      var tri = triangle(400, 600, 200);
      expect(tri.kind()).toBe("(at least) degenerate");
    })
  });

  describe("Equilaterials", function() {
    test("have equal sides", function() {
      var tri = triangle(2, 2, 2);
      expect(tri.kind()).toBe("equilateral (and isosceles)");
    });

    test("sides may be floats", function() {
      var tri = triangle(10.5, 10.5, 10.5);
      expect(tri.kind()).toBe("equilateral (and isosceles)");
    });
  });

  describe("Isosceleses", function() {
    test("last two sides are equal", function() {
      var tri = triangle(3, 4, 4);
      expect(tri.kind()).toBe("isosceles");
    })

    test("first two sides are equal", function() {
      var tri = triangle(4, 4, 3);
      expect(tri.kind()).toBe("isosceles");
    });

    test("first and last sides are equal", function() {
      var tri = triangle(4, 3, 4);
      expect(tri.kind()).toBe("isosceles");
    });

    test("sides may be floats", function() {
      var tri = triangle(0.5, 0.4, 0.5);
      expect(tri.kind()).toBe("isosceles");
    });
  });

  describe("Scalenes", function() {
    test("no equal sides 1", function() {
      var tri = triangle(3, 4, 5);
      expect(tri.kind()).toBe("scalene");
    });

    test("no equal sides 2", function() {
      var tri = triangle(10, 11, 12);
      expect(tri.kind()).toBe("scalene");
    });

    test("no equal sides 3", function() {
      var tri = triangle(5, 4, 2);
      expect(tri.kind()).toBe("scalene");
    });

    test("no equal sides 4", function() {
      var tri = triangle(0.4, 0.6, 0.3);
      expect(tri.kind()).toBe("scalene");
    });
  });
});
