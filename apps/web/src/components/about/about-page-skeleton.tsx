export function AboutPageSkeleton() {
  return (
    <main style={{ paddingTop: 'var(--header-height)' }}>
      {/* Hero Section Skeleton */}
      <section 
        className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-surface)]"
        style={{
          paddingTop: 'var(--space-24)',
          paddingBottom: 'var(--space-24)'
        }}
      >
        <div
          className="max-w-7xl mx-auto"
          style={{
            paddingLeft: 'var(--space-4)',
            paddingRight: 'var(--space-4)'
          }}
        >
          <div className="text-center">
            <div 
              className="bg-gray-200 rounded animate-pulse mx-auto"
              style={{
                width: '120px',
                height: '16px',
                marginBottom: 'var(--space-4)'
              }}
            />
            <div 
              className="bg-gray-300 rounded animate-pulse mx-auto"
              style={{
                width: '80%',
                height: '60px',
                marginBottom: 'var(--space-8)'
              }}
            />
            <div 
              className="bg-gray-200 rounded animate-pulse mx-auto"
              style={{
                width: '70%',
                height: '24px',
                marginBottom: 'var(--space-12)'
              }}
            />
            <div 
              className="flex flex-col sm:flex-row justify-center"
              style={{ gap: 'var(--space-4)' }}
            >
              <div 
                className="bg-gray-300 rounded animate-pulse"
                style={{
                  width: '160px',
                  height: '48px'
                }}
              />
              <div 
                className="bg-gray-200 rounded animate-pulse"
                style={{
                  width: '120px',
                  height: '48px'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections Skeleton */}
      {Array.from({ length: 6 }).map((_, index) => (
        <section 
          key={index}
          className={index % 2 === 0 ? 'bg-[var(--color-surface)]' : 'bg-gray-50'}
          style={{
            paddingTop: 'var(--space-24)',
            paddingBottom: 'var(--space-24)'
          }}
        >
          <div
            className="max-w-7xl mx-auto"
            style={{
              paddingLeft: 'var(--space-4)',
              paddingRight: 'var(--space-4)'
            }}
          >
            <div className="text-center" style={{ marginBottom: 'var(--space-16)' }}>
              <div 
                className="bg-gray-300 rounded-full animate-pulse mx-auto"
                style={{
                  width: '64px',
                  height: '64px',
                  marginBottom: 'var(--space-6)'
                }}
              />
              <div 
                className="bg-gray-300 rounded animate-pulse mx-auto"
                style={{
                  width: '60%',
                  height: '36px',
                  marginBottom: 'var(--space-6)'
                }}
              />
              <div 
                className="bg-gray-200 rounded animate-pulse mx-auto"
                style={{
                  width: '80%',
                  height: '20px'
                }}
              />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, cardIndex) => (
                <div 
                  key={cardIndex}
                  className="bg-white rounded-xl shadow-sm border border-[var(--color-border-subtle)]"
                  style={{ padding: 'var(--space-8)' }}
                >
                  <div 
                    className="bg-gray-300 rounded animate-pulse"
                    style={{
                      width: '48px',
                      height: '48px',
                      marginBottom: 'var(--space-4)'
                    }}
                  />
                  <div 
                    className="bg-gray-300 rounded animate-pulse"
                    style={{
                      width: '70%',
                      height: '24px',
                      marginBottom: 'var(--space-3)'
                    }}
                  />
                  <div className="space-y-2">
                    <div 
                      className="bg-gray-200 rounded animate-pulse"
                      style={{
                        width: '100%',
                        height: '16px'
                      }}
                    />
                    <div 
                      className="bg-gray-200 rounded animate-pulse"
                      style={{
                        width: '90%',
                        height: '16px'
                      }}
                    />
                    <div 
                      className="bg-gray-200 rounded animate-pulse"
                      style={{
                        width: '80%',
                        height: '16px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
