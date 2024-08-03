import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { resolveAbsolutePath } from '../src/utils/path-utils.js'
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
describe('path-utils', () => {
  // absolute path in cwd
  const absolutePath = path.join(__dirname, '../dist')
  beforeEach(() => {
    fs.mkdirSync(absolutePath, { recursive: true })
  })
  afterEach(()=>{
    fs.rmdirSync(absolutePath, { recursive: true })
  })
  describe('resolveAbsolutePath', () => {
    it('should return absolute path with relative path', () => {
      expect(resolveAbsolutePath('./dist')).toBe(absolutePath)
    })
    it('should return absolute path with absolute path', () => {
      expect(resolveAbsolutePath(absolutePath)).toBe(absolutePath)
    })
  })
  describe('resolveAbsolutePath', () => {
    it('should throw error with invalid path', () => {
      expect(() => resolveAbsolutePath('./invalid')).toThrowError('The specified path does not exist:')
    })
  })
})
