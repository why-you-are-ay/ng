// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC165.sol";

// byte 함수 변환의 지문 데이터 계약 추적을 위함
/* ERC165 표준 : 우리의 계약 데이터가 다른 interface에서 생성된 데이터와 일치하는지 확인 
    >> 코드 바이팅으로 코드가 몇 바이트를 차지하는지 비교

*/
contract ERC165 is IERC165 {
    function supportsInterface(bytes4 interfaceID)
        public
        view
        virtual
        override
        returns (bool)
    {
        // return _supportInterfaces[interfaceID];
        return interfaceID == type(IERC165).interfaceId;
    }
}
