import { createClient } from "@supabase/supabase-js";

// .env 파일에 저장된 환경변수에서 Supabase 프로젝트 URL과 API 키 불러오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

// Supabase 클라이언트 생성 (URL과 키를 사용하여 연결 설정)
export const supabase = createClient(supabaseUrl, supabaseKey);
