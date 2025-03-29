const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1000

export async function withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES, delay = RETRY_DELAY_MS): Promise<T> {
    try {
        return await fn()
    } catch (error) {
        if (retries <= 0) throw error

        console.log(`Database operation failed, retrying in ${delay}ms... (${retries} retries left)`)
        await new Promise((resolve) => setTimeout(resolve, delay))

        return withRetry(fn, retries - 1, delay * 1.5)
    }
}

// Example usage:
// const result = await withRetry(() => prisma.user.findUnique({ where: { id } }))

