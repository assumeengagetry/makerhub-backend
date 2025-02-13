import bcrypt from 'bcryptjs';

// 使用bcrypt对密码进行哈希处理
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10); // 生成盐
    return bcrypt.hash(password, salt); // 使用盐对密码进行哈希处理
};

// 比较明文密码和哈希密码是否匹配
export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword); // 比较密码
};
