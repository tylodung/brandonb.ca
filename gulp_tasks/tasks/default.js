import { argv } from 'yargs'
import gulp from 'gulp'
import runSequence from 'run-sequence'

// Build the development environment, and watch files for changes
gulp.task('default', callback => {
  // If we don't want to register the serviceworker, we delete it
  // Very hacky way to do this!
  if (argv.noserviceworker) {
    process.env.SERVICEWORKER = false
    runSequence(
      'build:dev',
      'browser_sync',
      'third_party:dev',
      'delete:serviceworker',
      'watch',
      callback
    )
  } else {
    runSequence(
      'build:dev',
      'browser_sync',
      'third_party:dev',
      'watch',
      callback
    )
  }
})

gulp.task('third_party:dev', callback => {
  if (argv.thirdparty) {
    runSequence(
      'foursquare:dev',
      'instagram:dev',
      callback
    )
  } else {
    callback()
  }
})

gulp.task('third_party:prod', callback => {
  runSequence(
    'foursquare:prod',
    'instagram:prod',
    callback
  )
})
