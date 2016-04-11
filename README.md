# Hashing Collision Resolution
Examples of hashing collision resolution using linear probing, quadratic probing and chaining written in TypeScript.

### Sample output

    
    Testing for string "ASEARCHINGEXAMPLE" and a hash table of size 19.
    
    Linear Probing
    
    0  1   2   3   4  5   6   7   8   9   10  11  12  13  14  15  16  17  18
    -  --  --  --  -  --  --  --  --  --  --  --  --  --  --  --  --  --  --
       A
    S  A
    S  A              E
    S  A-  A          E
    S  A   A          E                                                   R
    S  A   A   C      E                                                   R
    S  A   A   C      E           H                                       R
    S  A   A   C      E           H   I                                   R
    S  A   A   C      E           H   I                   N               R
    S  A   A   C      E       G   H   I                   N               R
    S  A   A   C      E-  E   G   H   I                   N               R
    S  A   A   C      E-  E-  G-  H-  I-  X               N               R
    S  A-  A-  C-  A  E   E   G   H   I   X               N               R
    S  A   A   C   A  E   E   G   H   I   X           M   N               R
    S  A   A   C   A  E   E   G   H   I   X           M   N       P       R
    S  A   A   C   A  E   E   G   H   I   X       L   M   N       P       R
    S  A   A   C   A  E-  E-  G-  H-  I-  X-  E   L   M   N       P       R
    
    
    Quadratic Probing
    
    0  1   2   3  4  5   6   7  8   9  10  11  12  13  14  15  16  17  18
    -  --  --  -  -  --  --  -  --  -  --  --  --  --  --  --  --  --  --
       A
    S  A
    S  A             E
    S  A-  A         E
    S  A   A         E                                                 R
    S  A   A   C     E                                                 R
    S  A   A   C     E          H                                      R
    S  A   A   C     E          H   I                                  R
    S  A   A   C     E          H   I                  N               R
    S  A   A   C     E       G  H   I                  N               R
    S  A   A   C     E-  E   G  H   I                  N               R
    S  A   A   C     E-  E-  G  H-  I          X       N               R
    S  A-  A-  C  A  E   E   G  H   I          X       N               R
    S  A   A   C  A  E   E   G  H   I          X   M   N               R
    S  A   A   C  A  E   E   G  H   I          X   M   N       P       R
    S  A   A   C  A  E   E   G  H   I          X-  M-  N   L   P       R
    S  A-  A   C  A  E-  E-  G  H-  I          X-  M   N   L   P   E   R
    
    
    Chaining
    
    0  1  2  3  4  5  6  7  8  9  10  11  12  13  14  15  16  17  18
    -  -  -  -  -  -  -  -  -  -  --  --  --  --  --  --  --  --  --
    S  A     C     E     G  H  I          L   M   N       P       R
       |           |
       A           E
       |           |
       A           X
                   |
                   E
