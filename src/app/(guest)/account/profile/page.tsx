import ProfileForm from "@/app/(guest)/account/profile/profile-form";
import ProfileSection from "@/app/(guest)/account/profile/profile-section";

export default function ProfileGuestPage() {
  return (
    <div className="w-full">
      <div className="w-full px-[30px] pb-[10px] bg-white border">
        <div className="py-[18px] border-b">
          <div className="text-xl">Hồ Sơ Của Tôi</div>
          <div className="text-sm mt-1">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <div className="pt-[30px]">
          <ProfileSection />
        </div>
      </div>
    </div>
  )
}
