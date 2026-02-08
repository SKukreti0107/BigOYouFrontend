const PYTHON_STARTER_CODE = 
`class Solution:
    def solve(self):
        # write your code here
        pass

#----------------------------------------------------
if __name__ == "__main__":
    Solution().solve()
`;

const CPP_STARTER_CODE = `#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int solve() {
        // write your code here
        return 0;
    }
};

//----------------------------------------------------
int main() {
    Solution sol;
    cout << sol.solve() << endl;
    return 0;
}
`;

const JAVA_STARTER_CODE = `import java.util.*;

class Solution {
    public int solve() {
        // write your code here
        return 0;
    }


    //----------------------------------------------------
    public static void main(String[] args) {
    Solution sol = new Solution();
    System.out.println(sol.solve());
    }

`;

export { PYTHON_STARTER_CODE, CPP_STARTER_CODE, JAVA_STARTER_CODE }