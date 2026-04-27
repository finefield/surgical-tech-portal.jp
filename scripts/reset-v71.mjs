import { execSync } from 'child_process';

const V71_COMMIT = 'ebde277df8a81dcf73ba7348a054b2ccaf86296c';

try {
  console.log('Resetting to V71...');
  execSync(`git reset --hard ${V71_COMMIT}`, { 
    cwd: '/vercel/share/v0-project',
    stdio: 'inherit' 
  });
  console.log('Successfully reset to V71');
} catch (error) {
  console.error('Error:', error.message);
}
