import React from "react";
import {
  Search,
  User,
  Menu,
  Globe,
  Library,
  ClipboardList,
  Music4,
  Bell,
  Home,
  Box,
  FileText,
  MessageCircle,
  CircleUserRound,
  ChevronRight,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const quickMenus = [
  { label: "홈페이지", icon: Globe },
  { label: "도서관", icon: Library },
  { label: "신청현황", icon: ClipboardList },
  { label: "기상송", icon: Music4 },
];

const favoritePosts = [
  {
    board: "자유게시판",
    title: "조용히 하세요 4층",
    likes: 6,
    comments: 2,
    isNew: false,
  },
  {
    board: "익명게시판",
    title: "안녕하세요 소신발언 하겠습니다",
    likes: 2,
    comments: 1,
    isNew: true,
  },
  {
    board: "행정위원회",
    title: "7월 행정위원회 공략 이행 보고",
    likes: null,
    comments: null,
    isNew: false,
  },
  {
    board: "질문게시판",
    title: "궁금한게 있는데 이 문제는 어",
    likes: null,
    comments: null,
    isNew: true,
  },
  {
    board: "방탈게시판",
    title: "안녕하세요 융합프로젝트 팀",
    likes: null,
    comments: null,
    isNew: true,
  },
];

function DotPagination() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <span className="h-2.5 w-2.5 rounded-full bg-violet-600" />
      <span className="h-2 w-2 rounded-full bg-zinc-300" />
      <span className="h-2 w-2 rounded-full bg-zinc-300" />
      <span className="h-2 w-2 rounded-full bg-zinc-300" />
      <span className="h-2 w-2 rounded-full bg-zinc-300" />
      <span className="h-2 w-2 rounded-full bg-zinc-300" />
    </div>
  );
}

function TopHeader() {
  return (
    <div className="space-y-5 px-6 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          <h1 className="text-[22px] font-extrabold tracking-tight">박강현</h1>
          <span className="pb-0.5 text-sm text-zinc-500">231045</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-600">
          <Search className="h-6 w-6" />
          <User className="h-6 w-6" />
          <Menu className="h-6 w-6" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 px-2">
        {quickMenus.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-zinc-600">
                <Icon className="h-8 w-8 stroke-[1.8]" />
              </div>
              <span className="text-xs font-medium text-zinc-600">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NoticeCard() {
  return (
    <Card className="rounded-[24px] border-0 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-extrabold tracking-tight">
              전체공지
            </span>
            <Badge className="h-5 rounded-md bg-violet-600 px-1.5 text-[10px]">
              N
            </Badge>
          </div>
          <p className="text-lg text-zinc-500">[5월 치킨알바 공지]</p>
        </div>
        <div className="rounded-full p-2 text-zinc-600">
          <Bell className="h-10 w-10 stroke-[1.8]" />
        </div>
      </CardContent>
    </Card>
  );
}

function PointCard() {
  return (
    <Card className="rounded-[24px] border-0 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
      <CardContent className="flex items-center justify-between gap-4 p-6">
        <div className="space-y-2">
          <h2 className="text-[18px] font-extrabold tracking-tight">
            상벌점 누계
          </h2>
          <p className="text-lg text-zinc-500">이번주는 벌점이 없습니다</p>
        </div>
        <div className="flex min-w-20 items-center justify-center rounded-full bg-violet-50 px-4 py-3 shadow-inner">
          <span className="text-xl font-extrabold text-violet-700">34pt</span>
        </div>
      </CardContent>
    </Card>
  );
}

function FavoritesCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-extrabold tracking-tight">즐겨찾기</h2>
        <button className="flex items-center gap-1 text-sm font-medium text-zinc-500">
          더보기 <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <Card className="rounded-[24px] border-0 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
        <CardContent className="space-y-4 p-5">
          {favoritePosts.map((post, idx) => (
            <div
              key={`${post.board}-${idx}`}
              className="flex items-center gap-3 text-sm"
            >
              <div className="min-w-[72px] font-semibold text-zinc-800">
                {post.board}
              </div>
              <div className="min-w-0 flex-1 truncate text-zinc-500">
                {post.title}
              </div>
              <div className="flex shrink-0 items-center gap-2 text-zinc-600">
                {post.likes !== null && (
                  <span className="flex items-center gap-1 text-emerald-500">
                    <ThumbsUp className="h-3.5 w-3.5" /> {post.likes}
                  </span>
                )}
                {post.comments !== null && (
                  <span className="text-zinc-700">Q {post.comments}</span>
                )}
                {post.isNew && (
                  <Badge className="h-5 rounded-md bg-violet-600 px-1.5 text-[10px]">
                    N
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function BottomTabBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-white px-8 pb-8 pt-5 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between text-zinc-500">
        <Home className="h-7 w-7 fill-black text-black" />
        <Box className="h-7 w-7" />
        <div className="relative">
          <FileText className="h-7 w-7" />
          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-emerald-500" />
        </div>
        <div className="relative">
          <MessageCircle className="h-7 w-7" />
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 text-[10px] font-bold text-white">
            2
          </span>
        </div>
        <CircleUserRound className="h-7 w-7" />
      </div>
      <div className="mx-auto mt-5 h-1.5 w-36 rounded-full bg-black/85" />
    </div>
  );
}

export default function MobileHomeShadcnMockup() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="relative min-h-screen bg-zinc-100">
        <div className="flex-1 overflow-hidden">
          <TopHeader />

          <main className="mx-auto max-w-5xl space-y-5 px-6 pb-40 pt-10">
            <NoticeCard />
            <PointCard />
            <DotPagination />
            <FavoritesCard />
          </main>
        </div>

        <BottomTabBar />
      </div>
    </div>
  );
}
