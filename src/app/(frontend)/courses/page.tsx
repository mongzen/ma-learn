import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'คอร์สออนไลน์ | MaLearn',
  description: 'เรียนรู้ทักษะใหม่ด้วยคอร์สออนไลน์คุณภาพสูง เรียนได้ทุกที่ทุกเวลา',
}

export default async function CoursesPage() {
  const payload = await getPayload({ config })

  // ดึงข้อมูลคอร์สทั้งหมด
  const courses = await payload.find({
    collection: 'courses',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 12,
    sort: '-createdAt',
  })

  // ดึงข้อมูลหมวดหมู่
  const categories = await payload.find({
    collection: 'categories',
    limit: 10,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              คอร์สออนไลน์
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              เรียนรู้ทักษะใหม่ด้วยคอร์สคุณภาพสูง เรียนได้ทุกที่ทุกเวลา
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold">{courses.totalDocs}</div>
                    <div className="text-blue-100">คอร์สทั้งหมด</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{categories.totalDocs}</div>
                    <div className="text-blue-100">หมวดหมู่</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold">∞</div>
                    <div className="text-blue-100">ความรู้</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium">
            ทั้งหมด
          </button>
          {categories.docs.map((category) => (
            <button
              key={category.id}
              className="px-6 py-2 bg-white text-gray-700 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.docs.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
                {course.thumbnail && typeof course.thumbnail === 'object' && (
                  <img
                    src={`/api/media/file/${course.thumbnail.filename}`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
                    {course.difficulty === 'beginner' && 'เริ่มต้น'}
                    {course.difficulty === 'intermediate' && 'กลาง'}
                    {course.difficulty === 'advanced' && 'ขั้นสูง'}
                  </span>
                </div>
                {course.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">
                      ⭐ แนะนำ
                    </span>
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {course.category && typeof course.category === 'object' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      {course.category.title}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.shortDescription}
                </p>

                {/* Course Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span>⏱️ {course.duration?.hours} ชั่วโมง</span>
                    <span>📚 {course.duration?.lessons} บทเรียน</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ฿{course.price?.fiatPrice?.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {courses.totalDocs > courses.docs.length && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              โหลดคอร์สเพิ่มเติม
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
