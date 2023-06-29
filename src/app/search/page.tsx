import UserSearch from '@/components/UserSearch';
import React from 'react';

function SearchPage() {
  // page : 사용자 인증 없이 사용 가능 (검색)
  // view : 검색 입력창, 검색 결과 리스트, 검색 결과 가져오는 도중 spinner처리
  // how : 입력된 text를 keyword로 사용자의 리스트를 sanity(server)에서 가져온다.
  // how2 : 전체 사용자의 리스트를 가져오고, filter를 통해서 사용자 리스트를 변경한다.
  // condition : text(keyword)가 name, username에 해당하는지 확인해야함
  return <UserSearch />;
}

export default SearchPage;
